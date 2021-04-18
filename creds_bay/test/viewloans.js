// View All Loan_request in the database by agent and the admin
// View specific loan_request belongnig to the Customer for Customer view
// Edit Loan Only by agent
// Accept or Reject loan_state Admin only

const expect=require('chai').expect,
      fetch=require('node-fetch'),
      {TESTING_URL}=require('../constants/tests');

describe('View All Loan_request in the database by Agent and Admin only by providing their signed jwt token which they recieve when they hit the login routes.',()=>{
  describe('If  no auth-token or Empty token String in request header then return with Access Denied Message and 400 status',()=>{
    it('Status',(done)=>{
      var requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type":"application/json",
          "auth-token":""
        },
        redirect: 'follow'
      };
      fetch(`${TESTING_URL}/credsBay/api/loans/view`,requestOptions)
      .then((res,body) => {expect(res.status).equal(400);
       done();
     }).catch(done);
    })
  })
})

describe('View specific loan_request belongnig to the Customer for Customer view',()=>{
  describe('In case Of Invalid Email or Password return with 400 status ',()=>{
    it('Status',(done)=>{
      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body:{
          "email":"",
          "password":""
        },
        redirect: 'follow'
      };
      fetch(`${TESTING_URL}/credsBay/api/Customer/view/MyLoanStatus`,requestOptions)
      .then((res,body) => {expect(res.status).equal(400);
       done();
     }).catch(done);
    })
  })
})

describe('Edit Loan Request Agent Only',()=>{
  describe('In case of invalid or Id belonging to Usertype Other than Agent Returns A 400 status.',()=>{
    it('Status',(done)=>{
      var requestOptions = {
        method: 'PATCH',
        headers: {
          "Content-Type":"application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZkYWE1ZWRiMjAyYTA2YTQxOTYwMDkiLCJpYXQiOjE2MTc5NzIwNjB9.kmXyiR7wFljQTZIXg0zTuNLdpeBT53FAvwQxpik3j50",
          "agent_id"   : ""
        },
        body:[
            {"propName":"interest","value":100}
        ],
        redirect: 'follow'
      };
      var loan_req_id="";
      fetch(`${TESTING_URL}/credsBay/api/agent/loan/edit/${loan_req_id}`,requestOptions)
      .then((res,body) => {expect(res.status).equal(400);
       done();
     }).catch(done);
    })
  })
})

describe('Approval or Rejection Of Loan By Admin User type only',()=>{
  describe('In case of agent ID or Invalid ID belonging to Usertype Other than Admin Returns A 400 status.',()=>{
    it('Status',(done)=>{
      var requestOptions = {
        method: 'PATCH',
        headers: {
          "Content-Type":"application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZkYWE1ZWRiMjAyYTA2YTQxOTYwMDkiLCJpYXQiOjE2MTc5NzMzNTd9.qOJlSdDrDBXj1kBMdeM34DBw5NYkQOHAqIm6EaQKXhI"
        },
        body:{
            "admin_id":"606daa5edb202a06a4196009",
            "loan_decision":"Rejected"
        },
        redirect: 'follow'
      };
      fetch(`${TESTING_URL}/credsBay/api/admin/loanApproval/606ef6fdb496d47a8cfc4591`,requestOptions)
      .then((res,body) => {expect(res.status).equal(400);
       done();
     }).catch(done);
    })
  })
})
