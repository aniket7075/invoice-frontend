import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/invoice.css";

/* ===== GST STATE CODE MAP ===== */
const STATE_CODE_MAP = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chhattisgarh": "CG",
  "Delhi": "DL",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Odisha": "OD",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Tamil Nadu": "TN",
  "Telangana": "TS",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UK",
  "West Bengal": "WB"
};

const InvoiceForm = () => {
  const navigate = useNavigate();

  /* ===== TOAST ===== */
  const [toast, setToast] = useState({ show: false, type: "", msg: "" });
  const showToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => setToast({ show: false, type: "", msg: "" }), 3000);
  };

  /* ===== SHAKE ===== */
  const [shake, setShake] = useState(false);
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };
  

  /* ===== SELLER ===== */
  const [sellerName, setSellerName] = useState("");
  const [sellerGst, setSellerGst] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerPincode, setSellerPincode] = useState("");
  const [sellerStateName, setSellerStateName] = useState("");
  const [sellerStateCode, setSellerStateCode] = useState("");

  /* ===== CLIENT ===== */
  const [clientName, setClientName] = useState("");
  const [clientGst, setClientGst] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPincode, setClientPincode] = useState("");
  const [clientStateName, setClientStateName] = useState("");
  const [clientStateCode, setClientStateCode] = useState("");

  /* ===== ITEMS ===== */
  const [items, setItems] = useState([
    { description: "", hsn: "", quantity: 1, rate: 0, amount: 0 }
  ]);

  const invoiceDate = new Date().toLocaleDateString("en-GB");
  const invoiceNumber =
    "INV-" + new Date().getFullYear() + "-" + Date.now().toString().slice(-4);

  /* ===== PINCODE → STATE ===== */
  const fetchStateFromPincode = async (pin, setState, setCode) => {
    if (pin.length !== 6) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const state = data[0].PostOffice[0].State;
        setState(state);
        setCode(STATE_CODE_MAP[state] || "");
      } else {
        triggerShake();
        showToast("error", "Invalid pincode");
        setState("");
        setCode("");
      }
    } catch {
      triggerShake();
      showToast("error", "Pincode service unavailable");
    }
  };

  /* ===== ITEM HANDLERS ===== */
  const handleItemChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    updated[i].amount = updated[i].quantity * updated[i].rate;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", hsn: "", quantity: 1, rate: 0, amount: 0 }]);
  };

const removeItem = (index) => {
  if (items.length === 1) return;

  const rows = document.querySelectorAll(".item-row");
  const row = rows[index];

  if (row) {
    row.classList.add("removing");

    setTimeout(() => {
      setItems(prev => prev.filter((_, i) => i !== index));
    }, 350); // match CSS duration
  }
};


  const subtotal = items.reduce((s, i) => s + i.amount, 0);

  /* ===== FORM VALID ===== */
  const isFormValid =
    sellerName.trim() &&
    sellerGst.length === 15 &&
    sellerPincode.length === 6 &&
    clientName.trim() &&
    clientGst.length === 15 &&
    clientPincode.length === 6 &&
    items.every(i => i.description && i.quantity > 0 && i.rate > 0);

  /* ===== SUBMIT ===== */
  const submit = () => {

  if (!isFormValid) {
    triggerShake();
    return showToast("error", "Please fill all required fields correctly");
  }

  // ✅ Success toast
  showToast("success", "Invoice generated successfully");

  // ✅ Direct redirect to preview page
  setTimeout(() => {
    navigate("/preview", {
      state: {
        sellerName,
        sellerGst,
        sellerAddress,
        sellerEmail,
        sellerPhone,
        sellerPincode,
        sellerStateName,
        sellerStateCode,

        clientName,
        clientGst,
        clientAddress,
        clientPincode,
        clientStateName,
        clientStateCode,

        invoiceDate,
        invoiceNumber,
        items,
        subtotal
      }
    });
  }, 800);
};


  return (
    <>
      <Navbar />

      <div className={`invoice-form ${shake ? "shake" : ""}`}>
        <h2>Invoice Form</h2>

        <h3>Seller Details</h3>
        <input placeholder="Seller Name" onChange={e => setSellerName(e.target.value)} />
        <input placeholder="Seller GSTIN" onChange={e => setSellerGst(e.target.value)} />
        <input placeholder="Seller Address" onChange={e => setSellerAddress(e.target.value)} />
        <input placeholder="Seller Email" onChange={e => setSellerEmail(e.target.value)} />
        <input placeholder="Seller Phone" onChange={e => setSellerPhone(e.target.value)} />

        <input
          placeholder="Seller Pincode"
          maxLength="6"
          value={sellerPincode}
          onChange={e => {
            const pin = e.target.value.replace(/\D/g, "");
            setSellerPincode(pin);
            fetchStateFromPincode(pin, setSellerStateName, setSellerStateCode);
          }}
        />

        <input placeholder="State Name" value={sellerStateName} readOnly />
        <input placeholder="State Code" value={sellerStateCode} readOnly />

        <h3>Client Details</h3>
        <input placeholder="Client Name" onChange={e => setClientName(e.target.value)} />
        <input placeholder="Client GSTIN" onChange={e => setClientGst(e.target.value)} />
        <input placeholder="Client Address" onChange={e => setClientAddress(e.target.value)} />

        <input
          placeholder="Client Pincode"
          maxLength="6"
          value={clientPincode}
          onChange={e => {
            const pin = e.target.value.replace(/\D/g, "");
            setClientPincode(pin);
            fetchStateFromPincode(pin, setClientStateName, setClientStateCode);
          }}
        />

        <input placeholder="State Name" value={clientStateName} readOnly />
        <input placeholder="State Code" value={clientStateCode} readOnly />

        <h3>Items</h3>
        {items.map((item, i) => (
          <div key={i} className="item-row">
            <input placeholder="Description" onChange={e => handleItemChange(i, "description", e.target.value)} />
            <input placeholder="HSN Code" onChange={e => handleItemChange(i, "hsn", e.target.value)} />
            <input type="text" value={item.quantity} onChange={e => handleItemChange(i, "quantity", +e.target.value)} />
            <input type="text" value={item.rate} onChange={e => handleItemChange(i, "rate", +e.target.value)} />
            <span>₹{item.amount}</span>
            <button type="button" className="remove-btn" onClick={() => removeItem(i)}>🗑️</button>
            

          </div>
        ))}

        <button onClick={addItem}>Add Item</button>

        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>

        <button
          onClick={submit}
          disabled={!isFormValid}
        >
          Generate Invoice
        </button>
      </div>

      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <footer className="about-footer">
        <p>© 2025 DW Innovation Pvt. Ltd. All rights reserved.</p>
      </footer>
    </>
  );
};

export default InvoiceForm;
