require 'rails_helper'

RSpec.describe Vote, type: :model do
  it { should have_valid(:thumbs).when(-1,0,1) }
  it { should_not have_valid(:thumbs).when(nil,"",98723469748623987) }
end
