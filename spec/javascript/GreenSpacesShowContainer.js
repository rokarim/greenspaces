import fetchMock from 'fetch-mock'
import GreenSpaceShowContainer from '../../app/javascript/react/components/GreenSpaceShowContainer';
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'

describe('GreenSpaceShowContainer', () => {
  let wrapper;
  let spaces;
  let params;

  beforeEach(() => {
    jasmineEnzyme();
    spaces = {green_space: {id: 1, name: "Statler Park", description: "I am a Park!"}}
    params = spaces.green_space.id
    fetchMock.get(`/api/v1/green_spaces/${params}`, {
      status: 200,
      body: spaces
    });
    wrapper = mount(
      <GreenSpaceShowContainer  params= {{id: params}} />
    )
  })
  afterEach(fetchMock.restore)

  it('should render react component with the information of the park', done => {
      setTimeout(() => {
        expect(wrapper.find('h1')).toHaveText("Statler Park");
        expect(wrapper.find('p')).toHaveText("I am a Park!");
        done();
      }, 0);
    });

  it ('should show a delete button for admin users', () => {

  })
});
