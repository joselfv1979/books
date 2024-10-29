import App from './App';
import { customRender } from './tests/utils/test-utils';

test('App mounts properly', () => {
    const wrapper = customRender(<App />);

    expect(wrapper).toBeTruthy();
});
