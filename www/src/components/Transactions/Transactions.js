import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col, Table, Container } from 'reactstrap';
import axios from 'axios';
import './Transactions.css';

import config from '../../config';

function Transactions()
{
  const [idToken, setIdToken] = useState('');
  const [TransactionsList, setTransactionsList] = useState([]);


  const getIdToken = () => {
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        setIdToken(keyVal[1]);
      }
    });
  };

  useEffect(() => {
    getIdToken();
    if (idToken.length > 0) {
      getAllTransactions();
    }
    else
    {
      // Test
  setTransactionsList(
    [
      {
        "date": "2021-01-01",
        "type": 1,
        "category": 2,
        "from_acc": 0,
        "to_acc": 1,
        "status": 1,
        "amount": 123.21,
        "desc": "Paying for TV License"
      },
      {
        "date": "2021-02-01",
        "type": 1,
        "category": 4,
        "from_acc": 0,
        "to_acc": 2,
        "status": 1,
        "amount": 43.21,
        "desc": "Transfer to BARC Debit - Ivo"
      }
    ]
    );
    }
    
  }, [idToken]);

  const clearCredentials = () => {
    window.location.href = config.redirect_url;
  }


  const addTransaction = async (event) => {
    const t_date = document.getElementById('date').value;
    const t_type = document.getElementById('type').value;
    const t_category = document.getElementById('category').value;

    const t_from_acc = document.getElementById('from_acc').value;
    const t_to_acc = document.getElementById('to_acc').value;

    const t_status = document.getElementById('status').value;
    const t_amount = document.getElementById('amount').value;
    const t_desc = document.getElementById('desc').value;
  
    const newTransaction = {
      "date": t_date,
      "type": t_type,
      "category": t_category,
      "from_acc": t_from_acc,
      "to_acc": t_to_acc,
      "status": t_status,
      "amount": t_amount,
      "desc": t_desc
    };
  
    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/transaction/`,
      headers: {
        Authorization: idToken
      },
      data: newTransaction
    });

    if (result && result.status === 200)
    { console.log("Successfully added."); }
    else
    { console.error("Error on adding new transaction."); }
  };
  
  const getAllTransactions = async () => {
    const result = await axios({
      url: `${config.api_base_url}/transaction/`,
      headers: {
        Authorization: idToken
      }
    }).catch(error => {
      console.log(error);
    });

    console.log(result);

    if (result && result.status === 401) {
      clearCredentials();
    } else if (result && result.status === 200) {
      console.log(result.data.Items);
      setTransactionsList(result.data.Items);
    }
  };

  

  return (
    <React.Fragment>
      <h3>Transactions</h3>
      <p>Add new transaction:</p>
      <Form inline>
        <FormGroup>
          <Container>
            <Row>
              <Col><Label for="date">Date:</Label> <Input type="text" name="date" id="date" placeholder="2021-02-28" size="10" /></Col>
              <Col><Label for="type">Type:</Label> <Input type="number" name="type" id="type" placeholder="1" size="1" /></Col>
              <Col><Label for="category">Category:</Label> <Input type="number" name="category" id="category" placeholder="1" size="3" /></Col>

              <Col><Label for="from_acc">From account:</Label> <Input type="number" name="from_acc" id="from_acc" placeholder="0" size="2" /></Col>
              <Col><Label for="to_acc">To account:</Label> <Input type="number" name="to_acc" id="to_acc" placeholder="1" size="2" /></Col>
            </Row>
          
            <Row>
              <Col><Label for="status">Status:</Label> <Input type="number" name="status" id="status" placeholder="1" size="1" /></Col>
              <Col><Label for="amount">Amount:</Label> <Input type="number" name="amount" id="amount" placeholder="123.45" size="10" /></Col>
              <Col><Label for="description">Description:</Label> <Input type="text" name="desc" id="desc" placeholder="Paying electricity bill" size="80" /></Col>
            </Row>
          </Container>
        </FormGroup>
        <Button onClick={addTransaction} color="primary" className="ml-1">Add</Button>
      </Form>
      
      <p>Latest transactions:</p>
      <Table size="sm" dark>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>

          <th>From</th>
          <th>To</th>

          <th>Status</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {TransactionsList.map((item, index) => (
        <tr>
          <td>{item.date}</td>
          <td>{item.type}</td>
          <td>{item.category}</td>

          <td>{item.from_acc}</td>
          <td>{item.to_acc}</td>

          <td>{item.status}</td>
          <td>{item.amount}</td>
          <td>{item.desc}</td>
        </tr>
        ))}
      </tbody>
      </Table>
    </React.Fragment>
  );
}


export default Transactions;
