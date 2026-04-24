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
import _ from "lodash";
import { getAllQuizForAdmin } from "../../../services/apiQuiz";
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
      let c = dataClone.find((item) => item.question_id !== id);
      setDataQuestions([c]);
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

  const handleSubmitQuestion = async () => {
    // Validate
    //Quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Not empty Quiz");
      return;
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
      return;
    }
    if (isCorrectA === false) {
      toast.error(
        `There must be a correct answer to the question ${idQs + 1} `,
      );
      return;
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
      return;
    }

    //Submit
    await Promise.all(
      dataQuestions.map(async (item) => {
        const resQ = await postCreateQuestion(
          +selectedQuiz.value,
          item.description,
          item.questionImage,
        );
        await Promise.all(
          item.answers.map(async (val) => {
            const resA = await postCreateQuestionByAnswers(
              resQ.DT.id,
              val.description,
              val.correct_answer,
            );
            console.log("check res >>>", resA);
          }),
        );
      }),
    );
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
            onChange={setSelectedQuiz}
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
            <Button variant="primary" onClick={handleSubmitQuestion}>
              Submit
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ManageQuestions;
