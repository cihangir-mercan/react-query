import {Icon} from "@blueprintjs/core";
import {useQuery} from "react-query";
import {getTexts} from "../apis";
import "./History.scss";

export default function History() {
    const {isLoading, isError, data, error} = useQuery("texts", getTexts);

    if (isLoading)
        return (
            <h2>isLoading...</h2>
        );

    if (isError)
        return (
            <h2>{error}</h2>
        );

    return (
        <>
            <h2>
                History
            </h2>

            {
                data.length < 1 &&
                <Icon className="nodata__icon" icon="zoom-out" size={60} />
            }

            {
                data.length >= 1 &&
                <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped history__table">
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td colSpan={6}><Icon className="table__icon" icon="manually-entered-data"/>{item.text}</td>
                            <td colSpan={6}><Icon className="table__icon" icon="translate"/>{item.translatedText}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </>
    );
}