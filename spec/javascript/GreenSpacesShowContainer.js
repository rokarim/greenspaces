import fetchMock from 'fetch-mock'
import GreenSpaceShowContainer from '../../app/javascript/react/components/GreenSpaceShowContainer';

describe('GreenSpaceShowContainer', () => {
  let wrapper;
  let spaces;
  let response;
  let params;

  beforeEach(() => {
    spaces = [
      { id: 1, name: "Statler Park", description: "I am a Park!"}
    ]
    params = spaces[0].id
    response = fetchMock.get(`/api/v1/green_spaces/${params}`, {
      status: 200,
      body: spaces
    });
    wrapper = mount(
      <GreenSpaceShowContainer  params= {params} />
    )
  })
  afterEach(fetchMock.restore)

  it('should render react component with the information of the park', () => {
    //expect(wrapper.find('h1')).toBePresent()
    //console.log(response.status);
  });
});
