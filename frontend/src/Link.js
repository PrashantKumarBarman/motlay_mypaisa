import { Link } from "react-router-dom";

export default function CustomLink(props) {
    return (
        <Link {...props} style={{ textDecoration: 'none' }}>{props.children}</Link>
    )
}