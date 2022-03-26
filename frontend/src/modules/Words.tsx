import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row, ListGroup, Modal, Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { GETALL_WORDS, WORDS_CRUD } from "./constants";
import { UseMainDataContext } from "./State";

function WordsHome(props: any) {
    const { State } = UseMainDataContext()
    const { Auth, IsLoggedin, User, AccessToken } = State

    const [ShowEditmodel, setShowEditmodel] = useState(false);
    const [Currentword, setCurrentword] = useState({ word: "", id: 0 });
    const [showsucessalert, setshowsucessalert] = useState(false)
    const [showdeletealert, setshowdeletealert] = useState(false)
    const [action, setaction] = useState("Edited")

    const wordslist = props.words

    function ShowEditWord(word: any) {
        setShowEditmodel(true);
        setaction("Edited")
        setCurrentword(word)
    }

    function HideEditModal() {
        setShowEditmodel(false)
    }

    function showDeleteWord(word: any) {
        setCurrentword(word)
        setshowdeletealert(true)
    }

    function deleteWord() {
        axios.delete(WORDS_CRUD + Currentword.id, {
            headers: { Authorization: "Bearer " + AccessToken }
        })
            .then(resp => {
                setaction("Deleted")
                setshowsucessalert(true)
                props.setwords((oldwords: any[]) => { return oldwords.filter(val => val.id != Currentword.id) })

            }
            )
        setshowdeletealert(false)
    }

    return (
        <>
            <ListGroup>
                {wordslist.map((word: any) => {
                    return (<ListGroup.Item key={word.id}>
                        <Row >
                            <Col lg={4} className="d-grid py-2">{word.word}  </Col>
                            <Col lg={2} className="d-grid py-2">created by  </Col>
                            <Col lg={2} className="d-grid py-2">{word.author}  </Col>
                            {User?.username === word.author && <Col lg={2} className="d-grid px-4"><Button onClick={() => ShowEditWord(word)}>Edit</Button> </Col>}
                            {User?.username === word.author && <Col lg={2} className="d-grid px-4">  <Button onClick={() => showDeleteWord(word)} variant="danger" >Delete</Button> </Col>}
                        </Row>
                    </ListGroup.Item>)
                })}
            </ListGroup>

            <SweetAlert show={showsucessalert} title={action + " Sucessfully"} onConfirm={() => { setshowsucessalert(false) }} />


            <SweetAlert
                show={showdeletealert}
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={deleteWord}
                onCancel={() => { setshowdeletealert(false) }}
                focusCancelBtn
            >
            </SweetAlert>

            <Modal show={ShowEditmodel} centered onHide={() => HideEditModal()}>
                <Modal.Header closeButton className="text-center">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Word
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ word: Currentword.word }}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            setShowEditmodel(false)
                            var temp: any = wordslist?.find((word: any) => word.id == Currentword.id)
                            temp!.word = values.word
                            axios.put(WORDS_CRUD + temp.id, { 'word': temp!.word }, {
                                headers: { Authorization: "Bearer " + AccessToken }
                            })
                                .then(resp =>
                                    setshowsucessalert(true)
                                )

                        }}>
                        {
                            ({ values,
                                handleChange,
                                handleSubmit,
                                isSubmitting, }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Word</Form.Label>
                                        <Form.Control
                                            placeholder="Edit Word" name="word" type="text" value={values.word} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="d-grid">
                                        <Button className="btn-round" variant="primary" type="submit">
                                            Edit
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )
                        }

                    </Formik>


                </Modal.Body>
            </Modal>
        </>
    );
}

export default WordsHome;


