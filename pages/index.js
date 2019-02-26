import Link from "next/link";
import styles from "../less/index.less";

export default () => (
    <div>
        <div className={styles.Entry}>
            <h1>RICHARD LI </h1>
            <h4>read more , get more</h4>
            <Link href="/blog">
                <a href="">blog</a>
            </Link>
            <br />
            <Link href="/aboutme">
                <a>aboutMe</a>
            </Link>
            <br />
            <Link href="/sparetime">
                <a>spareTime</a>
            </Link>
        </div>
    </div>
);
