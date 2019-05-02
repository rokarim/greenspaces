import fetchMock from 'fetch-mock'
import GreenSpaceShowContainer from '../../app/javascript/react/containers/GreenSpaceShowContainer';
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'

describe('GreenSpaceShowContainer', () => {
  let wrapper;
  let response;
  let params;

  beforeEach(() => {
    response = {
      green_space: {
        id: 19,
        name: "Loraine Hill Park",
        description: "Williamsburg etsy everyday. Heirloom goth cray. Hashtag lumbersexual banh mi pork belly viral. Bitters hoodie wes anderson.",
        reviews: [
          {
            id: 34,
            title: "Review 1",
            body: "OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW OMG REVIEW WOW",
            rating: 3,
            created_at: "2019-04-25T21:36:44.675Z",
            user_info: {
              name: "notadmin notadmin",
              user_id: 2,
              profile_photo: {
                url: "https://greenspaces-production.s3.amazonaws.com/default/treeicon-green.png"
              }
            }
          },
          {
            id: 46,
            title: "Review 2",
            body: "asbla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla bla",
            rating: 4,
            created_at: "2019-04-29T17:50:28.597Z",
            user_info: {
              name: "testing testing",
              user_id: 4,
              profile_photo: {
                url: "https://greenspaces-development.s3.amazonaws.com/uploads/user/profile_photo/4/FRONT-2.jpg"
              }
            }
          }
        ],
        is_admin: true,
        user_id: 4
      }
    }

    fetchMock.get(`/api/v1/greenspaces/19`, {
      status: 200,
      body: response
    });

    wrapper = mount(
      <GreenSpaceShowContainer  params= { {id: 19} } />
    )
  })

  afterEach(fetchMock.restore)

  it('should render react component with the information of the park', (done) => {
    setTimeout(() => {
      expect(wrapper.find('h1')).toHaveText("Loraine Hill Park")
      expect(wrapper.text()).toContain("Williamsburg etsy everyday.")
      done()
    }, 0);
  });

  it('should render two review components with corresponding profile picture(if exists), title, description, thumbs up and down buttons, and vote count', (done) => {
    setTimeout(() => {
      expect(wrapper.text()).toContain("Review 1")
      expect(wrapper.text()).toContain("Review 2")
      expect(wrapper.find('img').at(0)).toHaveProp('src', "https://greenspaces-development.s3.amazonaws.com/uploads/user/profile_photo/4/FRONT-2.jpg")
      expect(wrapper.find('img').at(1)).toHaveProp('src', "https://greenspaces-production.s3.amazonaws.com/default/treeicon-green.png")
      done()
    }, 0);
  });

  it('should show the new review form after clicking New Review', (done) => {
    setTimeout(() => {
      wrapper.find('#newReviewButton').simulate('click')
      expect(wrapper.text()).toContain("New Review")
      expect(wrapper.text()).toContain("Title")
      expect(wrapper.text()).toContain("Rating")
      expect(wrapper.text()).toContain("Body")
    }, 0);
    done()
  });

  it('should be able to add a new review for a green space', (done) => {
    fetchMock.post(`/api/v1/greenspaces/19/reviews`, {
      body: {review: {
          title: 'This is a new review',
          rating: '3',
          body: 'This is the body for the new review and should be larger than 40 characters.',
          id: 76,
          created_at: "2019-05-02T14:54:19.354Z",
          green_space: {
            id: 19,
            name: "Loraine Hill Park",
            description: "Williamsburg etsy everyday. Heirloom goth cray. Hashtag lumbersexual banh mi pork belly viral. Bitters hoodie wes anderson.",
          },
          user_info: {
            name: "Bart Simpson",
            user_id: 4,
            profile_photo: {url: "https://greenspaces-production.s3.amazonaws.com/default/treeicon-green.png"}
          }
        }}
    });

    fetchMock.get(`/api/v1/users/4/reviews/76`, {
      status: 200,
      body: {vote: 0, vote_count: 0}
    });

    setTimeout(() => {
      wrapper.find('form').simulate('submit')
      setTimeout(() => {
        expect(wrapper.text()).toContain("This is a new review")
        done()
      }, 1);
    }, 0);
  });
});
