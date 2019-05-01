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
    // params = response.green_space.id
    // fetchMock.post(`/api/v1/greenspaces/search`, {
    //   body: JSON.stringify({
    //     search_string: "park" })
    // });

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

  // it('should render two review components wisth corresponding profile picture(if exists), title, and description', (done) => {
  //   setTimeout(() => {
  //     expect(wrapper.text()).toContain("Review 1")
  //     expect(wrapper.text()).toContain("Review 2")
  //     expect(wrapper.find('img').at(0)).toHaveProp('src', "https://greenspaces-development.s3.amazonaws.com/uploads/user/profile_photo/4/FRONT-2.jpg")
  //     expect(wrapper.find('img').at(1)).toHaveProp('src', "https://greenspaces-production.s3.amazonaws.com/default/treeicon-green.png")
  //     done()
  //   }, 0);
  // });
  //
  // it('should show the new review form after clicking New Review', (done) => {
  //   setTimeout(() => {
  //     wrapper.find('#newReviewButton').simulate('click')
  //     expect(wrapper.text()).toContain("New Review")
  //     expect(wrapper.text()).toContain("Title")
  //     expect(wrapper.text()).toContain("Rating")
  //     expect(wrapper.text()).toContain("Body")
  //     done()
  //   }, 0);
  // });
  //
  // it('should be able to add a new review for a green space', (done) => {
  //   setTimeout(() => {
  //     wrapper.find('#newReviewButton').simulate('click')
  //     setTimeout(() => {
  //       wrapper.find('#title').simulate('change', { target: { value: 'This is a new review' } })
  //       wrapper.find('#rating').simulate('change', { target: { value: '3' } })
  //       wrapper.find('#body').simulate('change', { target: { value: 'This is the body for the new review and should be larger than 40 characters.' } })
  //
  //       wrapper.find('form').simulate('submit')
  //
  //       setTimeout(() => {
  //         expect(wrapper.text()).toContain("Loraine Hill Park")
  //         expect(wrapper.text()).toContain("Review 1")
  //         expect(wrapper.text()).toContain("Review 2")
  //         expect(wrapper.text()).toContain("This is a new review")
  //       });
  //     });
  //     done()
  //   }, 0);
  // });
});
