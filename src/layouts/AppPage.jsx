import { Fragment } from "react"
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

const AppPage = ({ title, description, keywords, children }) => {
    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords.join(',')} />
            </Helmet>

            <Navbar />
            {children}
        </Fragment>
    )
}

export default AppPage;
