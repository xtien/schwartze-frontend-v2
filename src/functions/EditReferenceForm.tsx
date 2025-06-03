import {AdminPageApi, type PageReferenceRequest, PageReferenceTypeEnum} from "../generated-api";
import type {EditReferenceProps} from "../interface/EditReferenceProps";
import {useState} from "react";
import Selector from "../component/Selector.tsx";
import strings from "../strings.tsx";

const adminPageApi = new AdminPageApi();

export function EditReferenceForm({
                                      pageNumber,
                                      chapterNumber,
                                      key,
                                      setPage,
                                      toggleEditDone,
                                      toggleEditDoneParam
                                  }: EditReferenceProps) {

    const [editDone, setEditDone] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [type, setType] = useState<PageReferenceTypeEnum>();
    const [description, setDescription] = useState('');
    const [_key, setKey] = useState('');


    function handleDescriptionChange(event: { target: { value: string; }; }) {
        setDescription(event.target.value);
    }

    function handleKeyChange(event: { target: { value: string; }; }) {
        setKey(event.target.value);
    }

    function handleCancel() {

        setCancel(true);
    }

    function handleSubmit() {

        const postData: PageReferenceRequest = {
            reference: {
                key: _key,
                type: type,
                description: description
            }
        };

        adminPageApi.addPageReference(postData)
            .then(response => {
                if (response.data.page != null) {
                    setPage(response.data.page);
                }
                toggleEditDone();
            })
            .catch((errror) => {
                console.log(errror)
            });
    }



    if (editDone === true) {
        setEditDone(false);
        toggleEditDoneParam();
    }
    if (cancel === true) {
        setCancel(false);
        toggleEditDone();
    }

    return (
        <div className='add_reference'>
            <h5 className='mb-5'>{strings.addPageReferenceTitle}</h5>

            <div className="mb-3">{strings.chapter} {chapterNumber} {strings.page} {pageNumber}</div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <table width="60%" className='mt-2'>
                        <tbody>
                        <tr>
                            <td width="150px"><label htmlFor="status">Description</label></td>
                            <td><input
                                type="text"
                                className="form-control "
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                            /></td>
                        </tr>
                        </tbody>
                    </table>

                    <table width="60%" className='mt-2'>
                        <tbody>
                        <tr>
                            <td width="150px"><label htmlFor="status">Type</label></td>
                            <td>
                                <Selector
                                    enumType={PageReferenceTypeEnum}
                                    onChange={(selectedType) => setType(selectedType)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <table width="60%" className='mt-2'>
                        <tbody>
                        <tr>
                            <td width="150px"><label htmlFor="status">Key</label></td>
                            <td><input
                                type="text"
                                className="form-control "
                                id="description"
                                value={key}
                                onChange={handleKeyChange}
                            /></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <input
                                type="submit"
                                className="btn btn-outline-success mybutton mt-5 ml-5 mb-5"
                                value="Submit"
                            /></td>
                        <td>
                            <input
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-outline-danger mybutton mt-5 ml-5 mb-5"
                                value="Cancel"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
