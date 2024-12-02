import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            {/*<p className="footer-text">*/}
            {/*    Developed with <span className="heart">❤️</span> by Codies Coder*/}
            {/*</p>*/}
            <p className="footer-year">
                © {new Date().getFullYear()} MindShield. All Rights Reserved.
            </p>
        </footer>
    );
}

export default Footer;
