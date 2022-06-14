import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { formatPrice } from "../utils/format";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";
import { HomeProps } from "../utils/types";

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>MocNews.dev</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hello World!</span>
          <h1>
            Posts about the <span>Tech</span> world
          </h1>
          <p>
            <span>Support us for {product.value} month and:</span>
            <br />
            Get acess to all the publications on that website
            <br />
            Create posts to MocNews.dev (building)
            <br />
            Receive new posts in your e-mail (building)
          </p>
          <SubscribeButton productId={product.priceId} />
        </section>
        <img
          style={{ zIndex: -1 }}
          src="/images/person.svg"
          width="334px"
          height="838px"
          alt="Developer coding"
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LAJkuBX3kSuBYDmsptMl43L", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    value: formatPrice(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
