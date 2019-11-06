import React from 'react';
import { Table, Icon } from 'antd';
import reqwest from 'reqwest';

/*const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		render: name => `${name.first} ${name.last}`,
		width: '20%',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
		width: '20%',
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
];*/

const columns = [
  {
    key: '1',
    title: '名称',
    dataIndex: 'name',
    /*filters: [ // 表头的筛选菜单项
			{
				text: 'Joe',
				value: 'Joe',
			},
			{
				text: 'Jim',
				value: 'Jim',
			},
			{
				text: 'Submenu',
				value: 'Submenu',
				children: [
					{
						text: 'Green',
						value: 'Green',
					},
					{
						text: 'Black',
						value: 'Black',
					},
				],
			},
		],*/
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // 本地模式下，确定筛选的运行函数
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    // 排序函数
    sorter: (a, b) => a.name.length - b.name.length,
    // 排序方式
    sortDirections: ['descend'],
    // render: goodsName => goodsName
    /*render: (text, record) => (
			<span>
        <a>Delete</a>
      </span>
		)*/
  },
  {
    key: '2',
    title: '品牌',
    dataIndex: 'brand',
    filters: [
      // 表头的筛选菜单项
      {
        text: 'Joe',
        value: 'Joe',
      },
    ],
  },
  {
    key: '3',
    title: '上下架状态',
    dataIndex: 'status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: '4',
    title: '价格',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: '5',
    title: '规格',
    dataIndex: 'specs',
    filters: [
      // 表头的筛选菜单项
      {
        text: 'Joe',
        value: 'Joe',
      },
    ],
  },
  {
    key: '6',
    title: '类目',
    dataIndex: 'class',
    filters: [
      // 表头的筛选菜单项
      {
        text: 'Joe',
        value: 'Joe',
      },
    ],
  },
  {
    key: '7',
    title: '图片',
    dataIndex: 'pic',
  },
  {
    key: '8',
    title: '配送范围',
    dataIndex: 'range',
    filters: [
      // 表头的筛选菜单项
      {
        text: 'Joe',
        value: 'Joe',
      },
    ],
  },
  {
    key: '9',
    title: '库存',
    dataIndex: 'reserve',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: '10',
    title: '操作',
    dataIndex: 'edit',
    defaultSortOrder: 'descend',
    sortDirections: ['descend'],
    render: (text, record) => (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Icon
          type="edit"
          style={{
            fontSize: '16px',
            color: '#40a9ff',
            cursor: 'pointer',
          }}
        />
      </div>
    ),
  },
  /*	{
      title: 'Age',
      dataIndex: 'age',
      // 默认排序顺序
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },*/
];

class welcome extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: '/api/index/goodsList',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      console.log(data);
      pagination.total = data.totalCount;
      // pagination.total = 200;
      this.setState({
        loading: false,
        data: data.goodsList,
        pagination,
      });
    });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={(record, index) => `complete${record.id}${index}`}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
export default welcome;
