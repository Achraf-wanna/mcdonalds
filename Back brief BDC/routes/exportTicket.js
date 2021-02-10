const express = require('express')
const router = express.Router()
const PDFDocument = require("pdfkit");
const fs = require("fs");
const logs = require('../models/logs');
const log = require('../log');


router.post('/', (req,res) =>{

    var extra = req.body.extraArray
    try {
        const ticket = new PDFDocument();
        ticket.pipe(fs.createWriteStream("ticket/ticket.pdf"));
        ticket.image('logo.png', 250, 100, {fit: [100, 100]})
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.moveDown()
        ticket.fontSize(18)
              .text("--------------------------------",{ align: "center" })
        ticket.moveDown()
        ticket.fontSize(18)
              .text("Ticket de votre commande",{ align: "center" })
        ticket.moveDown()
        ticket.fontSize(15)
              .text("Article : "+req.body.ProdName+" : "+req.body.ProdPrice+" DH")
        ticket.moveDown()
        ticket.fontSize(15)
              .text("Supplémentaire :")
        ticket.moveDown()
        for (let index = 0; index < extra.length; index++) {
            ticket.fontSize(15)
              .text(extra[index].extraName+" : "+extra[index].extraPrice+" DH x"+extra[index].extraQuantity)
            
        }
        ticket.moveDown()
        ticket.fontSize(15)
              .text("Quantité : "+req.body.quantity)
              ticket.moveDown()
        ticket.fontSize(15)
              .text("Numéro de service à table : "+req.body.servTable)
        ticket.moveDown()
        ticket.fontSize(15)
              .text("Code Promo : "+req.body.promoCode)
        ticket.moveDown()
        ticket.fontSize(15)
              .text("Code fidélité : "+req.body.fidelCode)
        ticket.moveDown()
        ticket.fontSize(15)
              .text("--------------------------------",{ align: "center" })
        ticket.moveDown()
        ticket.fontSize(25)
              .text(req.body.totalPrice+" DH",{ align: "center" })
        ticket.moveDown()
        ticket.fontSize(15)
        .text("--------------------------------",{ align: "center" })
        ticket.moveDown()
        ticket.fontSize(15)
        .text("Merci Pour Votre Visite , à bientot",{ align: "center" })
        ticket.moveDown()

        
        ticket.end();


        res.status(200).json({
            message : 'Ticket generated'
        })

        log({
            file: 'exportTicket.js',
            line: '72',
            info: 'Print ticket',
            type: 'info'
        }, logs);
        
    } catch (error) {
        console.log(error);
        log({
            file: 'exportTicket.js',
            line: '84',
            info: error,
            type: 'Critical'
        }, logs);
    }
       
})










module.exports = router