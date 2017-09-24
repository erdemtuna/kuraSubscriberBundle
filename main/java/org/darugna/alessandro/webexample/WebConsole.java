package org.darugna.alessandro.webexample;

import java.util.Map;

import javax.servlet.ServletException;

import org.osgi.framework.BundleContext;
import org.osgi.service.http.HttpContext;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebConsole {

    private static final String APP_ID = "org.eclipse.web";

	private static final Logger s_logger = LoggerFactory.getLogger(WebConsole.class);

	private static BundleContext s_context;

	private HttpService          m_httpService;

	// ----------------------------------------------------------------
	//
	//   Dependencies
	//
	// ----------------------------------------------------------------

	public void setHttpService(HttpService httpService) {
		this.m_httpService = httpService;
	}

	public void unsetHttpService(HttpService httpService) {
		this.m_httpService = null;
	}


	// ----------------------------------------------------------------
	//
	//   Activation APIs
	//
	// ----------------------------------------------------------------

	protected void activate(BundleContext context, Map<String,Object> properties) {
		s_logger.info("Bundle " + APP_ID + " has started!");
		s_context = context;

		HttpContext httpCtx = new OpenHttpContext(m_httpService.createDefaultHttpContext());
		try {
			//m_httpService.registerResources("/enerlife", "www", httpCtx);
			m_httpService.registerResources("/site", "src/main/webapp/old-index.html", httpCtx);
			m_httpService.registerResources("/static", "src/main/webapp/static", httpCtx);
			m_httpService.registerResources("/angular", "src/main/webapp/angular", httpCtx);
			m_httpService.registerResources("/angular-site", "src/main/webapp/index.html", httpCtx);

			// add below new services
			m_httpService.registerServlet("/api/status", new StatusServlet(), null, httpCtx);
		} catch (NamespaceException e) {
			s_logger.error("No http", e);
		} catch (ServletException e) {
			s_logger.error("No servlet", e);
		}
	}

	protected void deactivate(BundleContext context) {
		s_logger.info("deactivate...");

		m_httpService.unregister("/site");
		m_httpService.unregister("/static");
		m_httpService.unregister("/angular");
		m_httpService.unregister("/angular-site");
		m_httpService.unregister("/api/status");
	}

	public static BundleContext getBundleContext() {
		return s_context;
	}
}
