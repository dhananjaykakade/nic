const express = require('express');
// const { NotFoundError, ApiError } = require('../utils/customError');
const CustomResponse = require('../utils/CustomResponse');


// Test route for successful response
const getUserDetails = async (req, res) => {
    try {
      // Simulate fetching data from a database or service
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'Admin',
      };
  
      // Use the customResponse utility to send the response
      CustomResponse({
        res,
        statusCode: 200,
        message: 'User details fetched successfully',
        payload: user,
      });
    } catch (error) {
      // Send an error response
      CustomResponse({
        res,
        statusCode: 500,
        message: 'Failed to fetch user details',
        errors: [error.message],
      });
    }
  };
  
  module.exports = {
    getUserDetails,
  };
