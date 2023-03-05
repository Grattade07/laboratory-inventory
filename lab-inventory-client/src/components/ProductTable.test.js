import renderer from "react-test-renderer"
import ProductTable from "./ProductTable"
import { Provider } from 'react-redux';
import store from '../store/store';

/* tests that the filter component renders correctly  */
it("renders correctly", () => {
    const tree = renderer
        .create(<Provider store={store}>
                    <ProductTable />
                </Provider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})