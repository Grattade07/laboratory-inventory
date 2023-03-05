import renderer from "react-test-renderer"
import Login from "./Login"
import { Provider } from 'react-redux';
import store from '../store/store';

/* tests that the search bar component renders correctly  */
it("renders correctly", () => {
    const tree = renderer
        .create(<Provider store={store}>
                    <Login />
                </Provider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})