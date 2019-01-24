using System;
using Nancy;
using Nancy.Testing;
using Xunit;

namespace InterviewTest.Tests
{
    public class HelloWorldTest
    {
        [Fact]
        async public void FetchDefaultStuffFromNancy()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);

            var result = await browser.Get("/", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
