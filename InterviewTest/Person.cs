namespace InterviewTest
{
    public class Person
    {
        public string name { get; set; }
        public string id { get; set; }
        public Person(string name, string id)
        {
            this.name = name;
            this.id = id;
        }

        public Person() { }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            if (this.id == ((Person)obj).id)
            {
                return true;
            }
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return this.id.GetHashCode();
        }
    }
}