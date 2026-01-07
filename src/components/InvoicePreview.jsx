import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/PriviewNavbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./InvoiceExact.css";

/* ===== Amount in Words ===== */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const words = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`;
    if (n < 1000) return `${a[Math.floor(n / 100)]} Hundred ${words(n % 100)}`;
    if (n < 100000) return `${words(Math.floor(n / 1000))} Thousand ${words(n % 1000)}`;
    if (n < 10000000) return `${words(Math.floor(n / 100000))} Lakh ${words(n % 100000)}`;
    return "";
  };

  return `${words(Math.round(num)).trim()} Only`;
};

const InvoicePreview = () => {
  const { state } = useLocation();
  if (!state) return <h3>No Invoice Data</h3>;

  const items = state.items || [];

  const subtotal = Number(state.subtotal || 0);
  const cgst = Number((subtotal * 0.09).toFixed(2));
  const sgst = Number((subtotal * 0.09).toFixed(2));
  const grandTotal = Number((subtotal + cgst + sgst).toFixed(2));

  /* ===== PRINT ===== */
  const printInvoice = () => window.print();

  /* ===== PDF ===== */
  const downloadPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      pdf.save(`${state.invoiceNumber}.pdf`);
    });
  };
  return (
    <>
      <Navbar onPrint={printInvoice} onDownload={downloadPDF} />
s
      <div className="invoice-wrapper" id="invoice">

        {/* ===== HEADER ===== */}
        <div className="header-row">
          <div className="company-info">
<div className="logo-bgg">
    <img
      src="/DWI_logo.png"
      alt="DW Innovation Logo"
      className="logo-imgg"
    />
  </div>

            <h1>{state.sellerName}</h1>
            <p><b>GST No.</b> {state.sellerGst}</p>
           <b> <p>{state.sellerAddress}</p>
            <p>E-mail : {state.sellerEmail}</p>
            <p>Ph: {state.sellerPhone}</p> </b>
            <p>
              <b>State Name :</b> {state.sellerStateName},{" "}
              <b>State Code :</b> {state.sellerStateCode}
            </p>
            <p><b>Pincode :</b> {state.sellerPincode}</p>
          </div>

          <div className="tax-box">Tax Invoice</div>
        </div>

        {/* ===== CLIENT DETAILS ===== */}
        <div className="client-row">
          <div>
            <p><b>Client Name :</b> {state.clientName}</p>
            <p><b>Address :</b> {state.clientAddress}</p>
            <p><b>Pincode :</b> {state.clientPincode}</p>
            <p><b>GSTIN :</b> {state.clientGst}</p>
          </div>

          <div className="right-col">
            <p><b>Date :</b> {state.invoiceDate}</p>
            <p><b>Invoice No :</b> {state.invoiceNumber}</p>
            <p><b>State Name :</b> {state.clientStateName}</p>
            <p><b>State Code :</b> {state.clientStateCode}</p>
          </div>
        </div>

        {/* ===== ITEMS TABLE ===== */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>S.No</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "14%" }}>HSN Code</th>
              <th style={{ width: "8%" }}>Qty</th>
              <th style={{ width: "20%" }}>Rate</th>
              <th style={{ width: "22%" }}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td className="left">{item.description}</td>
                <td>{item.hsn || "-"}</td>
                <td>{item.quantity}</td>
                <td>{item.rate}</td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}

            <tr className="total-row">
              <td colSpan="5">Total Value</td>
              <td>{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5"> <b>CGST 9%</b></td>
              <td>{cgst.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5"><b>SGST 9%</b></td>
              <td>{sgst.toFixed(2)}</td>
            </tr>
            {/* <tr>
              <td colSpan="5">Gst Total</td>
              <td>{cgst+sgst}</td>
            </tr> */}
            <tr className="total-row">
              <td colSpan="5">Grand Total</td>
              <td>{grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        

        {/* ===== FOOTER ===== */}
        <div className="footer-row">
          <p><b>Amount in Words :</b> {numberToWords(grandTotal)}</p>

          <p className="declaration">
            <b>DECLARATION :</b><br />
            We declare that this invoice shows the actual price of the goods
            and/or services described and that all particulars are true and correct.
          </p>

          <div className="sign-box">
            <p><b>For {state.sellerName}</b></p>
            <p className="sign-line">Authorised Signature</p>
          </div>
        </div>

      </div>

      <footer className="about-footer">
        <p>© 2025 DW Innovation Pvt. Ltd. All rights reserved.</p>
      </footer>
      
    </>
    
  );
};

export default InvoicePreview;
