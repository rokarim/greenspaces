import fetchMock from 'fetch-mock'
import GreenSpaceShowContainer from '../../app/javascript/react/components/GreenSpaceShowContainer';
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'

describe('GreenSpaceShowContainer', () => {
  let wrapper;
  let response;
  let params;

  beforeEach(() => {
    jasmineEnzyme();
    response = {
      greenspace: {
        green_space:
        { id: 1, name: "Statler Park", description: "I am a Park!"}
      },
      reviews:  [
        {
          id: 14,
          title: "immersive experience",
          body: "Staff was very accommodating but the chef were no nonsense. The ambiance is clean and tranquil which is perfect if youre looking to have a conversation with a date or a friend.",
          rating: 4,
          user_id: 3,
          created_at: "2019-04-24T13:54:45.906Z"
        },
        {
          id: 30,
          title: "buying cycle",
          body: "Staff was very accommodating but the chef were no nonsense. The ambiance is clean and tranquil which is perfect if youre looking to have a conversation with a date or a friend.",
          rating: 4,
          user_id: 4,
          created_at: "2019-04-24T13:54:46.015Z"
        }
      ]
    }

    params = response.greenspace.green_space.id
    fetchMock.get(`/api/v1/green_spaces/${params}`, {
      status: 200,
      body: response
    });
    wrapper = mount(
      <GreenSpaceShowContainer  params= { {id: params} } />
    )
  })
  afterEach(fetchMock.restore)

  it('should render react component with the information of the park', (done) => {
    setTimeout(() => {
      expect(wrapper.find('h1')).toHaveText("Statler Park")
      expect(wrapper.text()).toContain("I am a Park!")
      done()
    }, 0);
  });

  it('should render two review components', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain("immersive experience")
      expect(wrapper.text()).toContain("Staff was very accommodating but the chef were no nonsense")
      expect(wrapper.text()).toContain("Stars: 4")
      expect(wrapper.text()).toContain("4/24/2019")
      done()
    }, 0);
  });
});
