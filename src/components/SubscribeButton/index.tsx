import styles from "./styles.module.scss";
import { SubscribeButtonProps } from "../../utils/types";
import { signIn, useSession } from "next-auth/react";

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    console.log("subscribe");
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe
    </button>
  );
}
