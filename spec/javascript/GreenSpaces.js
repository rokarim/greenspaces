import GreenSpace from '../../app/javascript/react/components/GreenSpace';

describe('GreenSpace', () => {
  let name,
      description,
      wrapper;

  beforeEach(() => {
    console.log("HEEEEREEEE");
    wrapper = mount(
      <GreenSpace
        name= "Statler Park"
        description= "I am a Park!"
      />
    );
  });

  it('should render react component with the information of the park', () => {
    expect(wrapper).toHaveText('Statler Park');
    expect(wrapper).toHaveText('I am a Park!');
  });
});
