import { Breadcrumb } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/A.module.scss";

interface AProps {
  text: string;
  href: string;
}

export default function A({ text, href }: AProps): React.ReactElement {
  return (
    <Link href={href}>
      <a className={styles.link}>{text}</a>
    </Link>
  );
}
