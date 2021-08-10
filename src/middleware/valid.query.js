const express = require('express');
const Joi = require('joi');

module.exports = function commonValidateQuery(schema){
    return (req, res, next) => {
        const data = req.query;
        try {
            const { error, value } = schema.validate(data);
            if (error) res.status(400).json({message: error.message});
            else next();
        } catch (error) {
            throw error;
        }
    };
}
