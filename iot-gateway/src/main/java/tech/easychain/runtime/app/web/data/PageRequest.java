package tech.easychain.runtime.app.web.data;

public class PageRequest {

	int page = 1;
	int pageSize = 25;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}
