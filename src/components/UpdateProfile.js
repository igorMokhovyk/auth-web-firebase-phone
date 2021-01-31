import {Card, Form, Button, Alert} from 'react-bootstrap';
import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function UpdateProfile() {
  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const history = useHistory();

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const passwordConfirmHandler = (event) => {
    setPasswordConfirm(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== passwordConfirm) {
      return setError("Passwords do not match")
    }

    const promises = [];
    setLoading(true)
    if (email !== currentUser.email) {
      promises.push(updateEmail(email))
    }

    if (password) {
      promises.push(updatePassword(password))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={emailHandler} required defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={passwordHandler} placeholder='Leave blank to keep the same'/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" onChange={passwordConfirmHandler} placeholder='Leave blank to keep the same'/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}
