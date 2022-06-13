import styles from "./styles.module.scss";
import { SubscribeButtonProps } from "../../utils/types";

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe
    </button>
  );
}
