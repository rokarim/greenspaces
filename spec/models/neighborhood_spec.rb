require 'rails_helper'

RSpec.describe Neighborhood, type: :model do
  it { should have_valid(:name).when("Hyde Park") }
  it { should_not have_valid(:name).when(nil,"") }
end
