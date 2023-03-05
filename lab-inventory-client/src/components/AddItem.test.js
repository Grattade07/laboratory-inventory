import renderer from "react-test-renderer"
import AddItem from "./AddItem"
import { Provider } from 'react-redux';
import store from '../store/store';
import {render} from "@testing-library/react"

/* tests that the add item component renders correctly. Found how to do from url: https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest  */
it("renders correctly", () => {
    const tree = renderer
        .create(<Provider store={store}>
                    <AddItem />
                </Provider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})

/* unit test makes sure that the inputs to add an item render with no value. Found how to do this from url: https://levelup.gitconnected.com/how-to-write-unit-tests-with-react-testing-library-d9624fd2b707 */
describe("AddItem component", () => {
    const mockChangeValue = jest.fn()
    const stubbedSearchValue = {
        name: "",
        location: "",
        batch: "",
        quantity: "",
        expiry: "",
        url: ""
    }

    it("Shows all input fields with empy values", () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <AddItem />
            </Provider>
        )

        expect(getByTestId("item-add-name").value).toBe("")
        expect(getByTestId("item-add-location").value).toBe("")
        expect(getByTestId("item-add-batch").value).toBe("")
        expect(getByTestId("item-add-quantity").value).toBe("")
        expect(getByTestId("item-add-expiry").value).toBe("")
        expect(getByTestId("item-add-url").value).toBe("")
    })
})