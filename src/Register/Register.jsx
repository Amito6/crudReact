import { 
    Container,
    Form,
    Modal,
    Button,
    Table
 } from "react-bootstrap";
 import "./Register.css";
 import { useState } from "react";
import useHttp from "../Hooks/useHttp";
 


const Register = () =>{
    const [modal,setModal] = useState(false);
    const [request,setRequest] = useState(null);
    const [httpResponse,httpError,httpLoader] = useHttp(request); /* it is called as array destructuring */

    const register = (e) =>{
        e.preventDefault();
        return setRequest({
            method : "get",
            url : "https://jsonplaceholder.typicode.com/posts"
        })
    }


    const design = (
        <>
            <Container className="py-4">
                {
                   JSON.stringify(httpLoader)
                }
                <h1 className="text-center fw-bold">Curd Operations in Reactjs</h1>
                <Button 
                onClick={()=>setModal(true)}
                className="bg-danger btn-design border-0"><i className="fa fa-plus"></i></Button>
                <Table /* striped border hover */ className="text-center mt-5">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Image</td>
                            <td>Just for code</td>
                            <td>a@gmail.com</td>
                            <td>9417848998</td>
                            <td>*******</td>
                        </tr>
                    </tbody>
                </Table>
                <Modal show={modal} onHide={()=>setModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form onSubmit={register}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control placeholder="Name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control placeholder="Select photo" type="file" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>email</Form.Label>
                                    <Form.Control placeholder="email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control placeholder="password" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control placeholder="mobile" />
                                </Form.Group>
                                <Button type="submit" className="bg-danger w-100 border-0">Register</Button>
                            </Form>
                        </Modal.Body>
                </Modal>
            </Container>
        </>
    );
    return design;
};

export default Register;