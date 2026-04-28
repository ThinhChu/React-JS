import React, { useEffect, useState } from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { LuImagePlus } from "react-icons/lu";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinus } from "react-icons/bs";
import "../../../assets/scss/manageQuestions.scss";
import { v4 as uuidv4 } from "uuid";
import _, { isObject } from "lodash";
import {
  getAllQuizForAdmin,
  getQuizWithQuestionAnswer,
  postUpsertQuizWithQA,
} from "../../../services/apiQuiz";
import { toast } from "react-toastify";
import { postCreateQuestion } from "../../../services/apiQuestion";
import { postCreateQuestionByAnswers } from "../../../services/apiAnswer";

const ManageQuestions = (props) => {
  const dataDemo = [
    {
      question_id: uuidv4(),
      description: "",
      questionImage: "",
      questionFileImage: "",
      answers: [
        {
          answers_id: uuidv4(),
          description: "",
          correct_answer: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [dataQuestions, setDataQuestions] = useState(dataDemo);
  const [dataQuizs, setDataQuizs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchAllDataQuizs();
  }, []);

  const fetchAllDataQuizs = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      const dataSelectQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: item.id + " - " + item.name,
        };
      });
      setDataQuizs(dataSelectQuiz);
    }
  };

  const handleActionAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const dataNewQuestions = {
        question_id: uuidv4(),
        description: "",
        questionImage: "",
        answers: [
          {
            answers_id: uuidv4(),
            description: "",
            correct_answer: false,
          },
        ],
      };
      setDataQuestions([...dataQuestions, dataNewQuestions]);
    } else if (type === "DELETE") {
      let dataClone = _.cloneDeep(dataQuestions);
      let c = dataClone.filter((item) => item.question_id !== id);
      setDataQuestions(c);
    }
  };

  const handleActionAddRemoveAnswer = (type, qId, aId) => {
    let dataClone = _.cloneDeep(dataQuestions);
    // let dataCloneQ = dataClone.find((item) => item.question_id === qId);
    if (type === "ADD") {
      let aw = {
        answers_id: uuidv4(),
        description: "",
        correct_answer: false,
      };
      let newDT = dataClone.map((item) =>
        item.question_id === qId
          ? {
              ...item,
              answers: [...item.answers, aw],
            }
          : item,
      );
      setDataQuestions(newDT);
    } else if (type === "DELETE") {
      let dataQById = dataClone.map((item) =>
        item.question_id === qId
          ? {
              ...item,
              answers: item.answers.filter((a) => a.answers_id !== aId),
            }
          : item,
      );
      setDataQuestions(dataQById);
    }
  };

  const handleOnChangeQuestions = (qId, value) => {
    let dataClone = _.cloneDeep(dataQuestions);
    let index = dataClone.findIndex((item) => item.question_id === qId);
    dataClone[index].description = value;
    setDataQuestions(dataClone);
  };

  const handleOnChangeFileQuestions = (qId, value) => {
    let dataClone = _.cloneDeep(dataQuestions);
    let index = dataClone.findIndex((item) => item.question_id === qId);
    dataClone[index].questionFileImage = value;
    dataClone[index].questionImage = value.name;
    setDataQuestions(dataClone);
  };

  const handleOnChangeAnswer = (type, qId, aId, value) => {
    let dataClone = _.cloneDeep(dataQuestions);
    let index = dataClone.findIndex((item) => item.question_id === qId);
    dataClone[index].answers = dataClone[index].answers.map((item) => {
      if (item.answers_id === aId) {
        if (type === "CHECKBOX") {
          item.correct_answer = value;
        } else if (type === "INPUT") {
          item.description = value;
        }
      }
      return item;
    });
    setDataQuestions(dataClone);
  };

  const validateQuiz = () => {
    // Validate
    //Quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Not empty Quiz");
      return false;
    }
    setIsSubmitted(true);
    // Answer
    let isValidA = true;
    let isCorrectA = true;
    let idA = 0;
    let idQs = 0;
    if (!_.isEmpty(dataQuestions)) {
      for (let index = 0; index < dataQuestions.length; index++) {
        for (let i = 0; i < dataQuestions[index].answers.length; i++) {
          if (dataQuestions[index].answers[i].description === "") {
            isValidA = false;
            idA = i;
            idQs = index;
            break;
          }
        }
        let indexCorrect = dataQuestions[index].answers.findIndex(
          (item) => item.correct_answer === true,
        );

        if (indexCorrect === -1) {
          isCorrectA = false;
          idQs = index;
          break;
        }
      }
    }
    if (isValidA === false) {
      toast.error(
        `Not empty description Answer ${idA + 1}, Question ${idQs + 1}`,
      );
      return false;
    }
    if (isCorrectA === false) {
      toast.error(
        `There must be a correct answer to the question ${idQs + 1} `,
      );
      return false;
    }
    // Questions
    let isValidQ = true;
    let idQ = 0;
    if (!_.isEmpty(dataQuestions)) {
      for (let index = 0; index < dataQuestions.length; index++) {
        if (dataQuestions[index].description === "") {
          isValidQ = false;
          idQ = index;
          break;
        }
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description Question ${idQ + 1}`);
      return false;
    }
    return true;
  };

  const handleSubmitQuestion = async () => {
    //Validate
    let check = validateQuiz();
    if (check) {
      //Submit
      await Promise.all(
        dataQuestions.map(async (item) => {
          const resQ = await postCreateQuestion(
            +selectedQuiz.value,
            item.description,
            item.questionFileImage,
          );
          if (resQ && resQ.EC === 0) {
            await Promise.all(
              item.answers.map(async (val) => {
                const resA = await postCreateQuestionByAnswers(
                  resQ.DT.id,
                  val.description,
                  val.correct_answer,
                );
                if (!resA || resA.EC !== 0) {
                  toast.error(resA.EM);
                  return;
                } else {
                }
              }),
            );
          } else {
            toast.error(resQ.EM);
            return;
          }
        }),
      );
      toast.success("Finish confirm Questions and Answers");
    }
  };

  const handleChangeQuiz = async (e) => {
    setSelectedQuiz(e);
    const res = await getQuizWithQuestionAnswer(e.value);
    if (res && res.EC === 0) {
      console.log(res.DT.qa);
      let data = res.DT.qa.map((item) => {
        return {
          question_id: item.id,
          description: item.description,
          questionImage: item.imageName,
          questionFileImage: item.imageFile,
          answers: item.answers.map((val) => {
            return {
              answers_id: val.id,
              description: val.description,
              correct_answer: val.isCorrect,
            };
          }),
        };
      });
      if (!_.isEmpty(data)) {
        setDataQuestions(data);
        setIsUpdate(true);
      } else {
        setDataQuestions(dataDemo);
        setIsUpdate(false);
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUpdateQuizWithQA = async () => {
    //Validate
    let check = validateQuiz();
    if (check) {
      //Submit
      let data = await Promise.all(
        _.cloneDeep(dataQuestions).map(async (item) => {
          let base64 = "";
          if (
            isObject(item.questionFileImage) &&
            item.questionFileImage !== ""
          ) {
            base64 = await fileToBase64(item.questionFileImage);
          } else {
            base64 = item.questionFileImage
              ? `data:image/png;base64,${item.questionFileImage}`
              : "";
          }

          return {
            id: item.question_id,
            description: item.description,
            imageName: item.questionImage,
            imageFile: base64,
            answers: item.answers.map((val) => {
              return {
                id: val.answers_id,
                description: val.description,
                isCorrect: val.correct_answer,
              };
            }),
          };
        }),
      );

      let dataUpsert = {
        quizId: selectedQuiz.value,
        questions: data,
      };

      let res = await postUpsertQuizWithQA(dataUpsert);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
    }
  };

  return (
    <>
      <div className="header-admin">
        <h1>Manage Question</h1>
      </div>
      <hr />

      <div className="quiz-container pt-3">
        <div className="select-quiz-container" style={{ width: 350 }}>
          <div className="title-label mb-2">Select Quiz:</div>
          <Select
            value={selectedQuiz}
            options={dataQuizs}
            onChange={(e) => handleChangeQuiz(e)}
          />
        </div>
        <div className="question-container mt-4">
          <div className="title-label mb-2">Add Question:</div>
          <div className="content-add-question">
            {!_.isEmpty(dataQuestions) && (
              <Form>
                <div className="container-question">
                  {dataQuestions.map((item, key) => {
                    return (
                      <div
                        className="container-question-item"
                        key={item.question_id}
                      >
                        <Form.Group className="mb-3 group-question-item">
                          <FloatingLabel
                            label={"Question description " + (key + 1)}
                          >
                            <Form.Control
                              type="text"
                              value={item.description}
                              isInvalid={isSubmitted && !item.description}
                              onChange={(e) =>
                                handleOnChangeQuestions(
                                  item.question_id,
                                  e.target.value,
                                )
                              }
                            />
                          </FloatingLabel>
                          <label
                            className="upload-image"
                            htmlFor={item.question_id}
                          >
                            <LuImagePlus />
                            <span>
                              {item.questionImage
                                ? item.questionImage
                                : "Upload file"}
                            </span>
                            <Form.Control
                              type="file"
                              id={item.question_id}
                              hidden
                              onChange={(e) =>
                                handleOnChangeFileQuestions(
                                  item.question_id,
                                  e.target.files[0],
                                )
                              }
                            />
                          </label>
                          <div className="action-question">
                            <BsFillPatchPlusFill
                              style={{ color: "#3483ff" }}
                              onClick={() =>
                                handleActionAddRemoveQuestion("ADD")
                              }
                            />
                            {dataQuestions.length !== 1 && (
                              <BsPatchMinus
                                onClick={() =>
                                  handleActionAddRemoveQuestion(
                                    "DELETE",
                                    item.question_id,
                                  )
                                }
                              />
                            )}
                          </div>
                        </Form.Group>
                        {!_.isEmpty(item.answers) && (
                          <div className="container-answer">
                            {item.answers.map((val, i) => {
                              return (
                                <div className="container-answer-item" key={i}>
                                  <Form.Group className="mb-3 group-question-item pl-2">
                                    <Form.Check
                                      type="checkbox"
                                      // defaultChecked={val.correct_answer}
                                      checked={val.correct_answer}
                                      onChange={(e) =>
                                        handleOnChangeAnswer(
                                          "CHECKBOX",
                                          item.question_id,
                                          val.answers_id,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <FloatingLabel label={"Answers " + (i + 1)}>
                                      <Form.Control
                                        type="text"
                                        isInvalid={
                                          isSubmitted && !val.description
                                        }
                                        value={val.description}
                                        onChange={(e) =>
                                          handleOnChangeAnswer(
                                            "INPUT",
                                            item.question_id,
                                            val.answers_id,
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </FloatingLabel>
                                    <div className="action-question">
                                      <BsFillPatchPlusFill
                                        style={{ color: "#3483ff" }}
                                        onClick={() =>
                                          handleActionAddRemoveAnswer(
                                            "ADD",
                                            item.question_id,
                                            "",
                                          )
                                        }
                                      />
                                      {item.answers.length > 1 && (
                                        <BsPatchMinus
                                          onClick={() =>
                                            handleActionAddRemoveAnswer(
                                              "DELETE",
                                              item.question_id,
                                              val.answers_id,
                                            )
                                          }
                                        />
                                      )}
                                    </div>
                                  </Form.Group>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Form>
            )}
          </div>
          {!_.isEmpty(dataQuestions) && !_.isEmpty(dataQuestions[0].answers) ? (
            isUpdate ? (
              <Button variant="primary" onClick={handleUpdateQuizWithQA}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmitQuestion}>
                Submit
              </Button>
            )
          ) : (
            ""
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default ManageQuestions;
