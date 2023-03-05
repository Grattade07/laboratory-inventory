import renderer from "react-test-renderer"
import Filter from "./Filters"
import { Provider } from 'react-redux';
import store from '../store/store';

/* tests that the filter component renders correctly  */
it("renders correctly", () => {
    const tree = renderer
        .create(<Provider store={store}>
                    <Filter />
                </Provider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})