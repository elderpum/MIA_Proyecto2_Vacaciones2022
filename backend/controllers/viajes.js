const fs = require('fs')
const path = require('path')
const { response, request } = require('express')

const createViaje = async(req = request, res = response) => {
    const file = fs.readFileSync(path.resolve(__dirname, "../database/users.json"), 'utf-8');
    let jsonUsers = JSON.parse(file)
}