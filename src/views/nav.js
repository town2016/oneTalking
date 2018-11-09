import React, {Component} from 'react'
import '../static/less/nav.less'
import '../static/less/icon.css'
import {NavLink} from 'react-router-dom'
class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabList: [
        {
          name: '热点',
          nickName: 'HOT',
          icon: 'icon-round_link_fill',
          path: '/hot'
        }, {
          name: '发声',
          nickName: 'TALKING',
          icon: 'icon-round_rank_fill',
          path: '/talking'
        }, {
          name: '我',
          nickName: 'MY',
          icon: 'icon-round_people_fill',
          path: '/account'
        }
      ]
    }
  }
  render () {
    return (
      <div className='nav'>
        <ul className='flex flex-pack-justify flex-align-center'>
          {this.state.tabList.map((item, index) => (
            <li key={index} className='flex-1'>
              <NavLink to={item.path} activeClassName="active" className='flex flex-align-center'>
                <div className='icon-box'><span className={item.icon}></span></div>
                <span>{item.nickName}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Nav
