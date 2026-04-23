import React, { useEffect, useState } from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { LuImagePlus } from "react-icons/lu";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinus } from "react-icons/bs";
import "../../../assets/scss/manageQuestions.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const ManageQuestions = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataQuestions, setDataQuestions] = useState([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    fetchDataQuestions();
  }, []);

  const fetchDataQuestions = () => {
    const dataDemo = [
      {
        question_id: uuidv4(),
        description: "description",
        questionImage: "aaffs.png",
        answers: [
          {
            answers_id: uuidv4(),
            description: "Câu trả lời 1",
            correct_answer: false,
          },
          {
            answers_id: uuidv4(),
            description: "Câu trả lời 2",
            correct_answer: true,
          },
          {
            answers_id: uuidv4(),
            description: "Câu trả lời 3",
            correct_answer: false,
          },
        ],
      },
      {
        question_id: uuidv4(),
        description: "description 2",
        questionImage: "aaffs.png",
        answers: [
          {
            answers_id: uuidv4(),
            description: "Câu trả lời q2 1",
            correct_answer: false,
          },
          {
            answers_id: uuidv4(),
            description: "Câu trả lời q2 2",
            correct_answer: false,
          },
          {
            answers_id: uuidv4(),
            description: "Câu trả lời q2 3",
            correct_answer: false,
          },
        ],
      },
    ];
    setDataQuestions(dataDemo);
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
            value={selectedOption}
            options={options}
            onChange={setSelectedOption}
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
                          <FloatingLabel label="Question description">
                            <Form.Control
                              type="text"
                              defaultValue={item.description}
                              value={item.description}
                            />
                          </FloatingLabel>
                          <div className="upload-image">
                            <LuImagePlus />
                            <span>Upload file</span>
                            <Form.Control
                              type="file"
                              disabled
                              style={{ display: "none" }}
                            />
                          </div>
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
                                      defaultChecked={val.correct_answer}
                                      checked={val.correct_answer}
                                    />
                                    <FloatingLabel label="Answers">
                                      <Form.Control
                                        type="text"
                                        defaultValue={val.description}
                                        value={val.description}
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
        </div>
      </div>
    </>
  );
};

export default ManageQuestions;
