namespace InterviewTest
{
    using Nancy;

    public class MainModule : NancyModule
    {
        public MainModule()
        {
            Get("/", args => "Hello from Nancy running on CoreCLR");
        }
    }
}