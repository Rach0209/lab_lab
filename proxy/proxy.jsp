<%@page import="org.apache.poi.util.SystemOutLogger"%>
<%@page session="false"%>
<%@page import="java.net.*,java.io.*,java.util.*" %>
<%
	HttpURLConnection connection = null;
	InputStream is = null;
	OutputStream os = null;

	// 로그인된 세션없을 경우 500 코드 반환
	if (request.getSession().getAttribute("someThing") == null && request.getSession().getAttribute("someThingCheckedItem") == null) {
		response.setStatus(500);
	} else {
		try {
			if(request.getParameter("URL") != null && !request.getParameter("URL").isEmpty() || request.getParameter("URL") != "") {
				String resourceUrlStr = request.getParameter("URL");					
				URL resourceUrl = new URL(resourceUrlStr);
				connection = (HttpURLConnection)resourceUrl.openConnection();
				connection.setDoInput(true);
				connection.setRequestMethod(request.getMethod());
				response.setContentType(connection.getContentType());
				// 기존의 output을 비워준다.
				out.clear();
				// 현재 페이지의 출력 스트림을 새로운 출력 스트림으로 변경 -> 현재 출력 버퍼 저장 -> 새로운 내용 쓸 수 있는 상태 변경
				out = pageContext.pushBody();
				is = connection.getInputStream();
				os = response.getOutputStream();
				final int length = 8192; // 8KB
				byte[] bytes = new byte[length];
				int bytesRead = 0;
				while ((bytesRead = is.read(bytes, 0, length)) > 0) {
					os.write(bytes, 0, bytesRead);
				}
			}
		} catch(Exception e) {
			response.setStatus(500);
			System.out.println(e.getMessage());
		} finally {
			if(is != null) { is.close(); }
			if(os != null) { os.close(); }			
		}
	}
	
	
%>
