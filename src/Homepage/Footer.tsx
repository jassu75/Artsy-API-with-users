import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.artsy_footer_container}>
      <a href="https://www.artsy.net/" className={styles.artsy_footer}>
        Powered by
        <img
          className={styles.artsy_footer_logo}
          alt=""
          src="/assets/artsy_logo.svg"
        />
        Artsy
      </a>
    </footer>
  );
};

export default Footer;
