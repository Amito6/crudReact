import { 
    Container,
    Form,
    Modal,
    Button,
    Table
 } from "react-bootstrap";
 import "./Register.css";
 import { useEffect, useState } from "react";
import useHttp from "../Hooks/useHttp";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
 


const Register = () =>{

    const registerData = {
        name : "",
        email : "",
        password : "",
        mobile : "",
        profile : ""
    }

    const [input,setInput] = useState(registerData);
    const [modal,setModal] = useState(false);
    const [data,setData] = useState(null)
    /* const [request,setRequest] = useState({
        method : "get",
        url : "http://localhost:8080/0/5"
    }); */
    const [sweetAlert,setSweetAlert] = useState({
        state : false,
        title : "",
        icon : "default",
        message : ""
    })
    /* const [httpResponse,httpError,httpLoader] = useHttp(request); */ /* array destructuring */


    /* As no redux is getting used so we are going to switch to other method */
   /*  useEffect(()=>{
        if(request.method){
           if(httpResponse){
            setData(httpResponse.data)
           }
        }
        else{
            if(httpResponse){
                return (
                    setSweetAlert({
                        state : true,
                        message : "Data Inserted",
                        title : "Good Job",
                        icon : "success"
                    }),
                    setModal(false)
                )
            }
            if(httpError){
                return setSweetAlert({
                    state : true,
                    message : "error",
                    title : "Failed",
                    icon : "warning"
                })
            }
        }
    },[httpResponse,httpError,httpLoader]) */

    const Alert = () =>{
        const a = (
            <>
                <SweetAlert 
                show={sweetAlert.state}
                title={sweetAlert.title}
                type={sweetAlert.icon}
                customButtons = {
                    <>
                        <Button 
                        className="btn btn-primary"
                        onClick={()=>{setSweetAlert({state : false})}}
                        >Ok</Button>
                    </>
                }
                >
                    {sweetAlert.message}
                </SweetAlert>
            </>
        );
        return a;
    }
    useEffect(()=>{
        getData();
    },[])

    const getData = async() =>{
        const response = await axios({
            method : "get",
            url : "http://localhost:8080/0/20"
        });
        return setData(response.data.data);
    }

    const register = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios({
                method : "post",
                url : "http://localhost:8080/register",
                data : input
            });
            getData();
            return (
                setSweetAlert(
                    {
                        state : true,
                        message : "Data Inserted",
                        title : response.data.message,
                        icon : "success"
                    }
                ),
                setModal(false)
            )
        } catch (error) {
            return (
                setSweetAlert({
                    state : true,
                    title : error.response.data,
                    icon: "warning",
                    message : error.response.data
                })
            )
        }
        /* return setRequest({
            method : "post",
            url : "http://localhost:8080/register",
            data : input
        }) */
        /* next day work */
    }

    const updateValue = (e) => {
        const input = e.target;
        const key = input.name;
        const value = input.value;
        return setInput((oldData)=>{
            return {
                ...oldData,
                [key] : value
            }
        })
    }

    const uploadFile = (e) =>{
        let input = e.target;
        const file = input.files[0];
        const fReader = new FileReader();
        fReader.readAsDataURL(file);
        fReader.onload = (e) =>{
            const url = e.target.result;
            return setInput((oldData)=>{
                return {
                    ...oldData,
                    profile : url
                }
            })
        }
    }
    
    const Tr = ({item}) =>{
        console.log(item)
        const design =(
            <>
                <tr>
                    <td>{item.index + 1}</td>
                    <td>{
                        <img src={item.profile} width={40} alt="#"></img> 
                        }</td>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                        <button className="btn btn-primary px-2 p-1 mx-2"><i className="fa fa-edit"></i></button>
                        <button className="btn btn-danger px-2 p-1 mx-2"><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            </>
        );
        return design;
    }


    const design = (
        <>
            <Alert />
            <Container className="py-4">
               
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
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item,index)=>{
                                item['index'] = index
                                return <Tr key={index} item={item} />
                            })
                        }
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
                                    <Form.Control placeholder="Name" name="name" value={input.name} onChange={updateValue}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control placeholder="Select photo" type="file" onChange={uploadFile} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>email</Form.Label>
                                    <Form.Control placeholder="email" name="email" value={input.email} onChange={updateValue} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control placeholder="password" name="password" value={input.password} onChange={updateValue} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control placeholder="mobile" name="mobile" value={input.mobile} onChange={updateValue} />
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