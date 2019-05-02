import fetchMock from 'fetch-mock'
import GreenSpaceIndexContainer from '../../app/javascript/react/containers/GreenSpaceIndexContainer';
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'

describe('GreenSpaceIndexContainer', () => {
  let wrapper;
  let response;
  let params;

  beforeEach(() => {
    response = {
      green_spaces: [ {
        id: 19,
        name: "Loraine Hill Park",
        description: "Williamsburg etsy everyday. Heirloom goth cray. Hashtag lumbersexual banh mi pork belly viral. Bitters hoodie wes anderson.",
        reviews: [],
        coordinates: {lat: 42, lng: -71}
      },
      {
        id: 13,
        name: "Boston Common",
        description: "Boston Common etsy everyday. Heirloom goth cray. Hashtag lumbersexual banh mi pork belly viral. Bitters hoodie wes anderson.",
        reviews: [],
        coordinates: {lat: 42, lng: -71}
      }]
    }

    fetchMock.get(`/api/v1/greenspaces`, {
      status: 200,
      body: response
    });

    wrapper = mount(
      <GreenSpaceIndexContainer/>
    )
  })

  afterEach(fetchMock.restore)

  it('should render a list of parks', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain("Loraine Hill Park")
      expect(wrapper.text()).toContain("Boston Common")
      done()
    }, 0);
  });
});
