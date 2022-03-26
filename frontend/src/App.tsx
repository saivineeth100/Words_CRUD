import React, { useEffect, useState } from 'react';
import WordsHome from './modules/Words';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import NavigationMenu from './modules/Navigation';
import { UseMainDataContext } from "./modules/State";
import axios from 'axios';
import { Formik } from 'formik';
import { GETALL_WORDS, WORDS_CRUD } from './modules/constants';


function App() {
  const { ToggleAuthModal, State } = UseMainDataContext()
  const { IsLoggedin, AccessToken } = State

  const [wordslist, setwordslist] = useState<any[]>([]);

  const [ShowCreatemodel, setShowCreatemodel] = useState(false);


  function createNew() {
    if (IsLoggedin) {
      setShowCreatemodel(true)
    }
    else {
      ToggleAuthModal()
    }
  }

  useEffect(() => {
    axios.get(GETALL_WORDS)
      .then(reqdata => {
        console.log(reqdata.data.results)
        setwordslist(reqdata.data.results)
      }
      )
  }, [])

  return (
    <>
      <NavigationMenu />
      <Container>
        <Row className='p-2'>
          <Col lg={9}>
            <h1>Words List</h1>
          </Col >
          <Col lg={3} className="d-grid py-2">
            <Button onClick={createNew}>{IsLoggedin && "Create New"}{!IsLoggedin && "Login to create New"}</Button>
          </Col>
        </Row>
        <WordsHome words={wordslist} setwords={setwordslist} />
      </Container>


      <Modal show={ShowCreatemodel} centered onHide={() => setShowCreatemodel(false)}>
        <Modal.Header closeButton className="text-center">
          <Modal.Title id="contained-modal-title-vcenter">
            Create Word
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ word: "" }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              axios.post(WORDS_CRUD, { 'word': values!.word }, {
                headers: { Authorization: "Bearer " + AccessToken }
              })
                .then(resp => {
                  const data = resp.data
                  console.log(data)

                  setwordslist(oldwords => {
                    const newarray = [data,...oldwords]
                    return newarray
                  }
                  )
                  setShowCreatemodel(false)
                }
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
                      placeholder="Enter Word" name="word" type="text" value={values.word} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="d-grid">
                    <Button className="btn-round" variant="primary" type="submit">
                      Create
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

export default App;
