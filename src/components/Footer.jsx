import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>
            Invoice<span>Generator</span>
          </h3>
          <p>
            Professional GST invoicing solution with modern UI,
            automatic calculations, and PDF support.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <a href="/home">Home</a>
          <a href="/invoice">Generate Invoice</a>
          <a href="/about">About Us</a>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <p>© {new Date().getFullYear()} Invoice Generator</p>
          <p>All rights reserved</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
