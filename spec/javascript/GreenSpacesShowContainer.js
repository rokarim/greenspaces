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
      green_space:
        { id: 1,
          name: "Statler Park",
          description: "I am a Park!",
          reviews:  [
            {
              id: 14,
              title: "immersive experience",
              body: "Staff was very accommodating but the chef were no nonsense. The ambiance is clean and tranquil which is perfect if youre looking to have a conversation with a date or a friend.",
              rating: 4,
              user_info: { name: "Marcel Nienow", user_id: 2 },
              created_at: "2019-04-24T13:54:45.906Z"
            },
            {
              id: 30,
              title: "buying cycle",
              body: "Staff was very accommodating but the chef were no nonsense. The ambiance is clean and tranquil which is perfect if youre looking to have a conversation with a date or a friend.",
              rating: 4,
              user_info: { name: "Sally Smith", user_id: 4 },
              created_at: "2019-04-24T13:54:46.015Z"
            }
          ],
          is_admin: true,
          user_id: 1
        }
      }

    params = response.green_space.id
    fetchMock.get(`/api/v1/greenspaces/${params}`, {
      status: 200,
      body: response
    });

    fetchMock.post(`/api/v1/greenspaces/${params}/reviews`, {
      body: JSON.stringify({title: 'This is a new review',
                            rating: '3',
                            body: 'This is the body for the new review and should be larger than 40 characters.',
                            user_id: 1,
                            green_space_id: 1 })
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
      console.log(wrapper.debug())

      expect(wrapper.text()).toContain("immersive experience")
      expect(wrapper.text()).toContain("Staff was very accommodating but the chef were no nonsense")
      expect(wrapper.text()).toContain("Stars: 4")
      expect(wrapper.text()).toContain("4/24/2019")
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
      done()
    }, 0);
  });

  it('should be able to add a new review for a green space', (done) => {
    setTimeout(() => {
      wrapper.find('#newReviewButton').simulate('click')
      setTimeout(() => {
        wrapper.find('#title').simulate('change', { target: { value: 'This is a new review' } })
        wrapper.find('#rating').simulate('change', { target: { value: '3' } })
        wrapper.find('#body').simulate('change', { target: { value: 'This is the body for the new review and should be larger than 40 characters.' } })

        wrapper.find('form').simulate('submit')

        setTimeout(() => {
          expect(wrapper.text()).toContain("Statler Park")
          expect(wrapper.text()).toContain("immersive experience")
          expect(wrapper.text()).toContain("buying cycle")
          expect(wrapper.text()).toContain("This is a new review")
        });
      });
      done()
    }, 0);
  });

  it('should enable admin to delete reviews', (done) => {
    setTimeout(() => {
      wrapper.find('#deleteReviewButton')[1].simulate('click')
      setTimeout(() => {
        expect(wrapper.text()).not.toContain("This is a new review")
      })
      done()
    }, 0)
  })
});
