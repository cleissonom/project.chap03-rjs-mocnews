import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserSignedIn = true;
  const username = "Cleisson";

  return isUserSignedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {username}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba471" />
      Sign In with Github
    </button>
  );
}
