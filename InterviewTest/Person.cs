namespace InterviewTest
{
    public class Person
    {
        public string Name { get; set; }
        public string Id { get; set; }

        protected Person(string id, string name)
        {
            Name = name;
            Id = id;
        }

        public Person() { }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            return Id == ((Person)obj).Id || base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}