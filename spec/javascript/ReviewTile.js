import fetchMock from 'fetch-mock'
import ReviewTile from '../../app/javascript/react/components/ReviewTile';
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'

describe('ReviewTile', () => {
  let wrapper1;
  let wrapper2;

  beforeEach(() => {
    fetchMock.get(`/api/v1/users/1/reviews/1`, {
      status: 200,
      body: {vote: 0, vote_count: 25}
    });

    fetchMock.get(`/api/v1/users/1/reviews/2`, {
      status: 200,
      body: {vote: 0, vote_count: 13}
    });

    fetchMock.post(`/api/v1/users/1/reviews/1/votes`, {
      body: JSON.stringify(1)
    });

    fetchMock.post(`/api/v1/users/1/reviews/2/votes`, {
      body: JSON.stringify(-1)
    });

    wrapper1 = mount(
      <ReviewTile
      key={1}
      id={1}
      currentUser={1}
      userId={1}
      userName={"Bilbo Baggins"}
      profilePhoto={"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjB0KbHgv3hAhUlhuAKHah9AzoQjRx6BAgBEAU&url=https%3A%2F%2Fwww.halloweencostumes.com%2Fgoosebumps-slappy-the-dummy-mask.html&psig=AOvVaw2xWcZCL_7x3JnQeoDJ_eF7&ust=1556892466753226"}
      title={"Dummy!"}
      rating={3}
      body={"WHAT A DUMMY"}
      createdAt={Date.now()}
      />
    )

    wrapper2 = mount(
      <ReviewTile
      key={1}
      id={2}
      currentUser={1}
      userId={1}
      userName={"Bilbo Baggins"}
      profilePhoto={"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjB0KbHgv3hAhUlhuAKHah9AzoQjRx6BAgBEAU&url=https%3A%2F%2Fwww.halloweencostumes.com%2Fgoosebumps-slappy-the-dummy-mask.html&psig=AOvVaw2xWcZCL_7x3JnQeoDJ_eF7&ust=1556892466753226"}
      title={"Dummy!"}
      rating={3}
      body={"WHAT A DUMMY"}
      createdAt={Date.now()}
      />
    )
  })

  afterEach(fetchMock.restore)

  it('should increment the vote count by 1 when clicking thumbs up', (done) => {
    setTimeout(() => {
      expect(wrapper1.text()).toContain(25)
      expect(wrapper1.find('h3')).toHaveText("Dummy!")
      wrapper1.find('i').at(3).simulate('click')
      setTimeout(() => {
        expect(wrapper1.text()).toContain(26)
        done()
      })
    }, 0);
  });

  it('should decrement the vote count by 1 when clicking thumbs down', (done) => {
    setTimeout(() => {
      expect(wrapper2.text()).toContain(13)
      expect(wrapper2.find('h3')).toHaveText("Dummy!")
      wrapper2.find('i').at(4).simulate('click')
      setTimeout(() => {
        expect(wrapper2.text()).toContain(12)
        done()
      })
    }, 0);
  });
});
